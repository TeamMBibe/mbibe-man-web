import React, { Component } from "react";
import { observer } from "mobx-react";
import AWS from "aws-sdk"
import generalUtils from '../../components/util/GeneralUtils'
import userStore from '../data_stores/UserStore'
import uuidv1 from 'uuid/v1'
import filter from 'lodash/filter'


const BusinessManagement = observer(class BusinessManagement extends Component {

  constructor(props) {
    super(props);

    this.state = {
      USER_POOL_ID: "us-east-2_SVtG899jG",
      APP_CLIENT_ID: "2e1u1rr6k358jdf4j165kn4fu4",
      TEST_ID_POOL: 'us-east-2:58b685bb-94ef-40cf-b474-c11cc51d4f5a'
    }

    // Setup credentials and region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: this.state.TEST_ID_POOL
    });
    AWS.config.region = 'us-east-2'

    this.ddb = new AWS.DynamoDB({region: 'us-east-2'});
    this.docClient = new AWS.DynamoDB.DocumentClient();
    this.uuid = null;
  }

  getBusinessesAndGeoLocations() {
      var params = {
          TableName : "BusinessTable",
          AttributesToGet: ["BusinessName", "BusinessUUID", "Location"]
      };

      return new Promise((resolve, reject) => {
          this.ddb.scan(params, function(err, data) {
              if (err) {
                  console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                  reject(err);
              } else {
                const areas = data.Items.map(function(item) {
                  return ({
                    businessName: item.BusinessName.S,
                    businessUUID: item.BusinessUUID.S,
                    latitude: item.Location.M.latitude.N,
                    longitude: item.Location.M.longitude.N
                  })
                })
                resolve(areas);
              }
          })
      });
    }

  createBusiness(merchant_uuid, businessName, website, address) {
    const business_uuid = uuidv1()
    const date = generalUtils.getCurrentDate();
    var businessParams = {
        "TableName" : "business-table",
        "Item" : {
          'business_uuid' : {'S' : business_uuid },
          'merchant_uuid' : { 'S' : merchant_uuid},
          'business_name' : {'S' : businessName},
          'website' : { 'S' : website},
          'address' : {'S': address},
          'date_created' : {'S' : date}
        }
    };

    var merchantParams = {
        "TableName" : "merchant-table",
        "Item" : {
          'merchant_uuid' : { 'S' : merchant_uuid},
          'user' : { 'S' : userStore.email},
        }
    };

    var params = {
      AttributeDefinitions: [{
        AttributeName: "username",
        AttributeType: "S"
       }],
      KeySchema: [{
        AttributeName: "username",
        KeyType: "HASH"
       }],
      ProvisionedThroughput: {
       ReadCapacityUnits: 5,
       WriteCapacityUnits: 5
      },
      TableName: business_uuid
    };


    return new Promise((resolve, reject) => {
        this.ddb.putItem(businessParams, function(err, data) {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log(data);
            }
        })

        this.ddb.putItem(merchantParams, function(err, data) {
            if (err) {
              console.error(err);
              reject(err);
            } else {
              console.log(data);
            }
        })

        this.ddb.createTable(params, function(err, data) {
          if (err) reject(err); // an error occurred
          else resolve()         // successful response
        });
    });
  }

  getBusiness(uuid) {
        var params = {
            TableName : "BusinessTable",
            KeyConditionExpression: "BusinessUUID = :n",
            ExpressionAttributeValues: {
                ":n": { S:uuid }
            }
        };

        return new Promise((resolve, reject) => {
            this.ddb.query(params, function(err, data) {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    reject(err);
                } else {
                    console.log(data.Items[0]);
                    if(data.Items.length > 0) resolve(data.Items[0])
                    else resolve()
                }
            })
        });
    }

    getMerchantBusinesses() {
      var params = {
          TableName : "business-table",
          AttributesToGet: ["business_uuid", "business_name", "merchant_uuid", "address"]
      };

      return new Promise((resolve, reject) => {
          this.ddb.scan(params, function(err, data) {
              if (err) {
                  console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                  reject(err);
              } else {
                const res = filter(data.Items, ['merchant_uuid', {'S':userStore.merchant_uuid}])
                resolve(res);
              }
          })
      });
      }

    getMemberProfileForBusiness(uuid, username) {
          var params = {
              "TableName" : uuid,
              "KeyConditionExpression": "Username = :n",
              "ExpressionAttributeValues": {
                  ":n": { S:username }
              }
          };

          return new Promise((resolve, reject) => {
              this.ddb.query(params, function(err, data) {
                  if (err) {
                      console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                      reject(err);
                  } else {
                    console.log(data.Items);
                    if(data.Items.length > 0) resolve(data.Items[0])
                    else resolve(null)
                  }
              })
          });
      }

      getInvitation(code) {
            var params = {
                "TableName" : 'merchant-invite-table',
                "KeyConditionExpression": "invite_id = :n",
                "ExpressionAttributeValues": {
                    ":n": { S:code }
                }
            };

            return new Promise((resolve, reject) => {
                this.ddb.query(params, function(err, data) {
                    if (err) {
                        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                        reject(err);
                    } else {
                      console.log(data.Items);
                      if(data.Items.length > 0) {
                        resolve(data.Items[0])
                      }
                      else resolve(null)
                    }
                })
            });
        }

      getBusinessMenus(uuid) {
            var params = {
                "TableName" : "AreaMenusTable",
                "KeyConditionExpression": "BusinessUUID = :n",
                "ExpressionAttributeValues": {
                    ":n": { S:uuid }
                }
            };

            return new Promise((resolve, reject) => {
                this.ddb.query(params, function(err, data) {
                    if (err) {
                        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                        reject(err);
                    } else {
                      console.log(data.Items);
                      if(data.Items.length > 0) resolve(data.Items[0])
                      else resolve(null);
                    }
                })
            });
        }

      addMemberToBusiness(uuid, username) {
        const date = generalUtils.getCurrentDate();
        var params = {
            "TableName" : uuid,
            "Item" : {
              'Username' : {'S' : username },
              'LastVisit' : { 'S' : date} ,
              'MemberSince' : { 'S' : date},
              'OuncesByTapToday' : {'M': {}},
              "OuncesPouredEver": {"N": "0"},
              "OuncesPouredToday": {"N": "0"},
              "Points": {"N": "0"},
              'Rewards' : {"L" : []},
              "VisitsThisMonth": {"N": "1"},
              "VisitsThisWeek": {"N": "1"},
              "VisitsThisYear": {"N": "1"},
              "VisitsTotal": {"N": "1"}
            }
        };

        return new Promise((resolve, reject) => {
            this.ddb.putItem(params, function(err, data) {
                if (err) {
                  console.error(err);
                  reject(err);
                } else {
                  console.log(data);
                  resolve();
                }
            })
        });
      }



});

const businessManagement = new BusinessManagement();
export default businessManagement;
