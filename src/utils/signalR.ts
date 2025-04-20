import * as signalR from "@microsoft/signalr";

export async function createSignalRConnection(hubUrl: string) {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl)
    .configureLogging(signalR.LogLevel.Information)
    .build();

  await connection.start();
  console.log("✅ SignalR connected");
  await new Promise((res) => setTimeout(res, 180000));

  return connection;
}