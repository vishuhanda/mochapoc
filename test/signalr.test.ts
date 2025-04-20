import * as signalR from "@microsoft/signalr";
import axios from "axios";
import { createPersonnel } from "../src/APIS/Crossfire/personnel.api";

// dev
// const baseURL = "jci-osp-api-gateway-dev.osp-jci.com";
// const AppServerName= "vm-osp-data-ser";
// const ServerGuid= "dbe3376c-85bc-4510-a697-8df59cfd7256";
// const CrossfireServerUri= "net.tcp://10.2.0.6:8999/CrossFire/IClientSession";

// qa
const baseURL = "jci-osp-api-gateway-qa.osp-jci.com";
const AppServerName= "osp-qa-win-vm";
const ServerGuid= "9c018651-fcda-4a62-8c17-9889a0825510";
const CrossfireServerUri= "net.tcp://10.6.1.5:8999/CrossFire/IClientSession";

describe("🧪 SignalR Enterprise Test", () => {

    it("should receive a SignalR notification after personnel creation", async () => {
        const ApplicationId = generateRandomString(12);
        let messageReceived: any = null;

        console.log(`[${new Date().toISOString()}] 🔧 Starting test with Application ID: ${ApplicationId}`);

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`https://${baseURL}/NotificationHub`, )
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connection.onclose(err => console.error(`[${timestamp()}] ❌ Connection closed:`, err));
        connection.onreconnecting(err => console.warn(`[${timestamp()}] 🔄 Reconnecting...`, err));
        connection.onreconnected(id => console.log(`[${timestamp()}] ✅ Reconnected. Conn ID: ${id}`));


        const interval =  setInterval(() => {
            console.log("⏱ Still connected?", connection.state , new Date().toUTCString()); // Should be "Connected"
        }, 5000);


        const messagePromise = new Promise<any>((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error("❌ Did not receive message within expected time"));
            }, 220000); // 60s timeout

            connection.on("ReceiveMessage", (message: any) => {
                console.log(`[${timestamp()}] 📩 Received message:`, message);
                messageReceived = message;
                clearTimeout(timeout);
                clearInterval(interval)
                resolve(message);
            });
        });

        try {
            await connection.start();
            // await connection.invoke("SendMessage", "Hello!");
            console.log(`[${timestamp()}] ✅ SignalR connected, Conn ID: ${connection.connectionId}`);

            await subscribeToNotifications(ApplicationId, connection.connectionId);
            await registerToNotifications(ApplicationId);
            await registerTypeToNotifications(ApplicationId);

            // await createPersonnel(); // Triggers SignalR event

            // Wait for message or timeout
            await new Promise((res) => setTimeout(res, 180000));

            console.log("Hitting Personnel")
            await createPersonnel();
            await messagePromise;
            // await new Promise((res) => setTimeout(res, 25000));
            // expect(messageReceived).toBeDefined();
            // expect(typeof messageReceived).toBe("string"); // or shape check based on your backend

            console.log(`[${timestamp()}] 🎉 Test passed: Message received`);
        } catch (error) {
            console.error(`[${timestamp()}] 🚨 Test failed:`, error);
            throw error;
        } finally {
            await unregisterTypeToNotifications(ApplicationId);
            await unregisterToNotifications(ApplicationId);
            await unsubscribeToNotifications(ApplicationId);
            await stopConnection(connection);
        }
    });
});

// 🛠 Timestamped logging helper
function timestamp() {
    return new Date().toISOString();
}

// ✅ Existing axios methods below stay unchanged
// Keep your subscribeToNotifications, registerToNotifications, etc.

function generateRandomString(length: number) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    return Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join("");
}


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


async function rejoinToNotifications(ApplicationId:any,connectionId:any) {
    try {
        const response = await axios.put(
            `https://${baseURL}/api/NotificationHub/rejoin`, // Replace with your backend API
            {
                ApplicationId: ApplicationId,
                ConnectionId: connectionId
            },
        );
    } catch (err) {
        console.log("Error while rejoining:"+ err);
    }
  }