import { createPersonnel,deletePersonnel } from '../src/APIS/Crossfire/personnel.api';
import { createSignalRConnection } from '../src/utils/signalR';
import axios from "axios";

const baseURL = "jci-osp-api-gateway-qa.osp-jci.com";
const AppServerName = "osp-qa-win-vm";
const ServerGuid = "9c018651-fcda-4a62-8c17-9889a0825510";
const CrossfireServerUri = "net.tcp://10.6.1.5:8999/CrossFire/IClientSession";


describe('SignalR Tests', () => {
    let connection: signalR.HubConnection;
    let messagePayload: any;
    const ApplicationId = generateRandomString(12);
    let objectId: any = null

    before(async () => {
        connection = await createSignalRConnection(`https://${baseURL}/NotificationHub`);
    });

    after(async () => {
        await connection.stop();
    });

    it('Should receive ObjectCreated notification', async () => {
        await new Promise((res) => setTimeout(res, 10000));
        await subscribeToNotifications(ApplicationId, connection.connectionId);
        await registerToNotifications(ApplicationId);
        await registerTypeToNotifications(ApplicationId);
        let createdobjectid = await createPersonnel()
        objectId = createdobjectid?.data.ObjectID
        const received = await new Promise<boolean>((resolve) => {
            connection.on('ReceiveMessage', (message: string) => {
                const parsed = JSON.parse(message);
                console.log("🔔 Received:", parsed);

                if (parsed.NotificationType === 'ObjectCreated' && parsed.NotificationDSO.ObjectID === objectId) {
                    messagePayload = parsed;
                    resolve(parsed.NotificationDSO.ObjectID);
                }
            });

            // Timeout safeguard
            setTimeout(() => resolve(false), 10000);
        });

        // await unregisterTypeToNotifications(ApplicationId);
        // await unregisterToNotifications(ApplicationId);
        // await unsubscribeToNotifications(ApplicationId);


        // expect(received).toBe(objectId);
        // expect(messagePayload.NotificationDSO.ClassType).toBe("SoftwareHouse.NextGen.Common.SecurityObjects.Personnel");
    });

    it('Should receive ObjectDeleted notification', async () => {
        await new Promise((res) => setTimeout(res, 10000));

        // const ApplicationId = generateRandomString(12);
        // await subscribeToNotifications(ApplicationId, connection.connectionId);
        await registerTypeDeleteNotifications(ApplicationId);
        // await registerTypeToNotifications(ApplicationId);

        await deletePersonnel(objectId)
        const received = await new Promise<boolean>((resolve) => {
            connection.on('ReceiveMessage', (message: string) => {
                const parsed = JSON.parse(message);

                if (parsed.NotificationType === 'ObjectDeleted' && parsed.NotificationDSO.ObjectID === objectId) {
                    resolve(parsed.NotificationDSO.ObjectID);
                }
            });

            // Timeout safeguard
            setTimeout(() => resolve(false), 10000);
        });

        // await unregisterTypeToNotifications(ApplicationId);
        // await unregisterToNotifications(ApplicationId);
        // await unsubscribeToNotifications(ApplicationId);

    });

    // Add more tests for ObjectDeleted, StatusChanged, etc.
});



async function subscribeToNotifications(ApplicationId: any, connectionId: any) {
    console.log("Calling Subscribe");
    try {
        const response = await axios.put(
            `https://${baseURL}/api/NotificationHub/subscribe`, // Replace with your backend API
            {
                ApplicationId: ApplicationId,
                AppServerName: AppServerName,
                ConnectionId: connectionId,// Send the connectionId to the server
                ServerGuid: ServerGuid
            },
        );
        console.log("Subscribe Response: " + response.data);
        console.log("Subscribe Status Code: " + response.status);
    } catch (err) {
        console.log("Error for subscribe" + err);
    }
}

async function registerToNotifications(ApplicationId: any) {
    console.log("Calling Register");
    try {
        const response = await axios.put(
            `https://${baseURL}/api/NotificationHub/register`, // Replace with your backend API
            {
                AppServerName: AppServerName,
                CrossfireServerUri: CrossfireServerUri,
                ApplicationId: ApplicationId
            },
        );
        console.log("Register Response: " + response.data);
        console.log("Register Status Code: " + response.status);
    } catch (err) {
        console.log("Error for register:" + err);
    }
}







function generateRandomString(length: number) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join("");
}


async function registerTypeUpdateNotifications(ApplicationId: any) {

    try {

        const updateResponse = await axios.put(
            `https://${baseURL}/api/NotificationHub/registertype`, // Replace with your backend API
            {
                ApplicationId: ApplicationId,
                EventTypeFullName: "SoftwareHouse.CrossFire.Common.Core.ObjectChangedEventArgs",
                RequestedObjects: [
                    "SoftwareHouse.NextGen.Common.SecurityObjects.Personnel"]
            },
        );

        console.log("RegisterType Response: " + updateResponse.data);
        console.log("RegisterType Status Code: " + updateResponse.status);

    }
    catch (err) {
        console.log("Error for registerType:" + err);
    }


}

async function registerTypeDeleteNotifications(ApplicationId: any) {

    try {

        const deleteResponse = await axios.put(
            `https://${baseURL}/api/NotificationHub/registertype`, // Replace with your backend API
            {
                ApplicationId: ApplicationId,
                EventTypeFullName: "SoftwareHouse.CrossFire.Common.Core.ObjectDeletedEventArgs",
                RequestedObjects: [
                    "SoftwareHouse.NextGen.Common.SecurityObjects.Personnel"]
            },
        );

        console.log("RegisterTypeDelete Response: " + deleteResponse.data);
        console.log("RegisterTypeDelete Status Code: " + deleteResponse.status);

    }
    catch (err) {
        console.log("Error for registerType:" + err);
    }


}





async function registerTypeToNotifications(ApplicationId: any) {
    console.log("Calling RegisterType");
    try {
        const createResponse = await axios.put(
            `https://${baseURL}/api/NotificationHub/registertype`, // Replace with your backend API
            {
                ApplicationId: ApplicationId,
                EventTypeFullName: "SoftwareHouse.CrossFire.Common.Core.ObjectCreatedEventArgs",
                RequestedObjects: [
                    "SoftwareHouse.NextGen.Common.SecurityObjects.Personnel"
                ]
            },
        );

        console.log("RegisterType Response: " + createResponse.data);
        console.log("RegisterType Status Code: " + createResponse.status);
    } catch (err) {
        console.log("Error for registerType:" + err);
    }
}


async function unregisterTypeToNotifications(ApplicationId: any) {
    console.log("Calling UnregisterType");
    try {
        const createResponse = await axios.put(
            `https://${baseURL}/api/NotificationHub/unregistertype`,
            {
                ApplicationId: ApplicationId,
                EventTypeFullName: "SoftwareHouse.CrossFire.Common.Core.ObjectCreatedEventArgs",
                RequestedObjects: [
                    "SoftwareHouse.NextGen.Common.SecurityObjects.Personnel"
                ]
            },
        );

        console.log("UnregisterType Response: " + createResponse.data);
        console.log("UnregisterType Status Code: " + createResponse.status);
    } catch (err) {
        console.log("Error for unregistertype:" + err);
    }
}

async function unregisterToNotifications(ApplicationId: any) {
    console.log("Calling Unregister");

    try {
        const response = await axios.put(
            `https://${baseURL}/api/NotificationHub/unregister`,
            {
                AppServerName: AppServerName,
                CrossfireServerUri: "net.tcp://10.2.0.6:8999/CrossFire/IClientSession",
                ApplicationId: ApplicationId
            },
        );
        console.log("Unregister Response: " + response.data);
        console.log("Unregister Status Code: " + response.status);
    } catch (err) {
        console.log("Error for unregister:" + err);
    }
}

async function unsubscribeToNotifications(ApplicationId: any) {
    console.log("Calling Unsubscribe");

    try {
        const response = await axios.put(
            `https://${baseURL}/api/NotificationHub/unsubscribe`,
            {
                ApplicationId: ApplicationId
            },
        );
        console.log("Unsubscribe Response: " + response.data);
        console.log("Unsubscribe Status Code: " + response.status);
    } catch (err) {
        console.log("Error while unsubscribing:" + err);
    }
}


async function stopConnection(connection: any) {

    try {
        console.log("Stopping Connection")
        await connection.stop();
        console.log("Stopped Connection")
    }
    catch (err) {
        console.log("Error stopping connection:" + err);
    }
}


async function rejoinToNotifications(ApplicationId: any, connectionId: any) {
    try {
        const response = await axios.put(
            `https://${baseURL}/api/NotificationHub/rejoin`, // Replace with your backend API
            {
                ApplicationId: ApplicationId,
                ConnectionId: connectionId
            },
        );
    } catch (err) {
        console.log("Error while rejoining:" + err);
    }
}