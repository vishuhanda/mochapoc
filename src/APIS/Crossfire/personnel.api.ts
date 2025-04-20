import axios from 'axios';

// class PersonnelSignalr {

    export async function createPersonnel() {
        try {
            const url = 'http://jci-osp-api-gateway-qa.osp-jci.com/api/Generic/ExecuteCrossFireMethod?requestService=SoftwareHouse.CrossFire.Common.Shared.IEnhancedDataAccessService&methodName=PersistObject';

            // Prepare the request body data (converted from the curl data)
            const data = {
                ArgumentValues: [
                    {
                        "*state": 2,
                        "ClassType": "SoftwareHouse.NextGen.Common.SecurityObjects.Personnel",
                        "GUID": "00000000-0000-0000-0000-000000000000",
                        "Logical2": false,
                        "LocationMetaTagFullName": "",
                        "Logical4": false,
                        "FirstName": "Demo Kairav",
                        "EscortOption": {
                            "TypeName": "SoftwareHouse.NextGen.Common.SecurityObjectDefinitions.EscortOptionType",
                            "Value": 0,
                            "DisplayName": "None",
                            "__propertyType": "enum"
                        },
                        "CloudRegistrationCompleted": "0001-01-01T00:00:00",
                        "TemplateID": 0,
                        "LastVisitTime": "",
                        "APBExempt": false,
                        "SupervisorOption": {
                            "TypeName": "SoftwareHouse.NextGen.Common.SecurityObjectDefinitions.PersonnelSupervisionType",
                            "Value": 0,
                            "DisplayName": "None",
                            "__propertyType": "enum"
                        },
                        "ClearanceFilter": {
                            "TypeName": "SoftwareHouse.NextGen.Common.SecurityObjectDefinitions.ClearanceFilterTypes",
                            "Value": 1,
                            "DisplayName": "Clearance Filter Level 1",
                            "__propertyType": "enum"
                        },
                        "CanApproveRequests": false,
                        "EnableMobileAlert": false,
                        "AllowVisitReception": false,
                        "AreaID": -2147483648,
                        "PartitionKey": {
                            "TypeName": "SoftwareHouse.CrossFire.Common.Objects.Partition",
                            "Value": 1,
                            "DisplayName": "Default",
                            "__propertyType": "lookup"
                        },
                        "CloudRegistrationInitiated": "0001-01-01T00:00:00",
                        "PrimaryPortrait": null,
                        "Date4": "",
                        "Date2": "",
                        "Date3": "",
                        "Date1": "",
                        "EmailAddress": "",
                        "LastModifiedTime": "",
                        "Text4": "",
                        "Text3": "",
                        "Text2": "",
                        "Text1": "",
                        "AlternateShunt": false,
                        "Text9": "",
                        "Text8": "",
                        "AreaKey": {
                            "TypeName": "SoftwareHouse.NextGen.Common.SecurityObjects.Area",
                            "Value": -2147483648,
                            "DisplayName": "",
                            "__propertyType": "lookup"
                        },
                        "MiddleName": "",
                        "Text6": "",
                        "Int2": 0,
                        "EnableMobileKey": false,
                        "ManagerEmail": "",
                        "RegisterWithCloud": false,
                        "PersonnelType": {
                            "DisplayName": "None",
                            "TypeName": "SoftwareHouse.NextGen.Common.SecurityObjects.PersonnelType",
                            "Value": 1
                        },
                        "KeypadCommandAdmin": false,
                        "IntrusionZoneAdmin": false,
                        "Int9": 0,
                        "Int8": 0,
                        "Int1": 0,
                        "Int3": 0,
                        "Int5": 0,
                        "Int4": 0,
                        "Int7": 0,
                        "Int6": 0,
                        "CarpoolAreaKey": {
                            "TypeName": "SoftwareHouse.NextGen.Common.SecurityObjects.Area",
                            "Value": -2147483648,
                            "DisplayName": "",
                            "__propertyType": "lookup"
                        },
                        "AreaAccessTime": "",
                        "CarpoolAreaID": -2147483648,
                        "EnableForBLE": false,
                        "OnWatchList": false,
                        "Text5": "",
                        "Disabled": false,
                        "Protected": false,
                        "CanSubmitRequests": false,
                        "CanPerformGuardTour": false,
                        "LastModifiedByID": 1,
                        "Noticed": false,
                        "ImportedDecodedPIN": -1,
                        "PersonnelTypeID": 1,
                        "WindowsPrincipal": "",
                        "Text19": "",
                        "Text25": "",
                        "LastModifiedByType": {
                            "TypeName": "ERROR: Invalid Lookup failed, Bad non-int value; type: System.Type",
                            "Value": "SoftwareHouse.CrossFire.Common.Objects.Operator",
                            "DisplayName": "",
                            "__propertyType": "lookup"
                        },
                        "MobileEnrollmentStatus": "Not Registered",
                        "Template": false,
                        "Text16": "",
                        "Text17": "",
                        "Text14": "",
                        "MobileEnrollmentStatusWithDate": "Not Registered",
                        "Text12": "",
                        "Text13": "",
                        "Text10": "",
                        "Text11": "",
                        "TwoFactorUserID": "",
                        "Text15": "",
                        "Text18": "",
                        "CheckedInVisitKey": {
                            "TypeName": "SoftwareHouse.NextGen.Common.SecurityObjects.Visit",
                            "Value": 0,
                            "DisplayName": "",
                            "__propertyType": "lookup"
                        },
                        "CheckedInVisitID": 0,
                        "APBEvent": true,
                        "LostCredentials": 0,
                        "PartitionID": 1,
                        "Text24": "",
                        "Text21": "",
                        "Text20": "",
                        "Text23": "",
                        "Text22": "",
                        "ObjectID": 0,
                        "Text7": "",
                        "StolenCredentials": 0,
                        "Operator": {
                            "TypeName": "SoftwareHouse.CrossFire.Common.Objects.Operator",
                            "Value": -2147483648,
                            "DisplayName": "",
                            "__propertyType": "lookup"
                        },
                        "CarpoolDriverStatus": false,
                        "OperatorID": -2147483648,
                        "Name": "like",
                        "InactivityExempt": false,
                        "ADAPINExempt": false,
                        "LastName": "Patel",
                        "CanHost": false,
                        "CheckedInVisit": false,
                        "Logical1": false,
                        "Logical3": false,
                        "LastModifiedByOperator": {
                            "TypeName": "SoftwareHouse.CrossFire.Common.Objects.Operator",
                            "Value": 1,
                            "DisplayName": "",
                            "__propertyType": "lookup"
                        },
                        "ApplicationServer": {
                            "Name": "VM-OSP-DATA-SER",
                            "Status": {
                                "TypeName": "ACVS.Enterprise.Common.Services.ApplicationServerStatus",
                                "Value": 1,
                                "DisplayName": "Online",
                                "__propertyType": "enum"
                            }
                        },
                        "*appServer": "VM-OSP-DATA-SER",
                        "*container": [],
                        "DecodedPIN": "****",
                        "StartDateTime": ""
                    }
                ]
            };

            const headers = {
                'session-id': 'c2b95e5a-0720-b703-97a9-69a00a7fde88',
                'Content-Type': 'application/x-www-form-urlencoded'
            };

            // Make the API request using axios
            const response = await axios.post(url, `ArgumentValues=${encodeURIComponent(JSON.stringify(data.ArgumentValues))}`, { headers });

            // Log the response from the API
            console.log('Create Personnel API Response:' + response.status);
            console.log('API Response:', response.data);

            return response

        } catch (error) {
            console.error('Error executing API request:' + error);
        }
    }



export async function deletePersonnel(objectID:any) {
    try {
        const response = await axios.delete(
          `https://jci-osp-api-gateway-qa.osp-jci.com/api/Objects/Delete`,
          {
            params: {
              type: 'SoftwareHouse.NextGen.Common.SecurityObjects.Personnel',
              id: objectID
            },
            headers: {
              'session-id': 'c2b95e5a-0720-b703-97a9-69a00a7fde88',
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );

        console.log('Delete successful:', response.data);
      } catch (error) {
        console.error('Error executing API request:' + error);
    }
    }