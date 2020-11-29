import { SciChartSurface } from "scichart/Charting/Visuals/SciChartSurface";
import { NumericAxis } from "scichart/Charting/Visuals/Axis/NumericAxis";
import * as socketIOClient from "socket.io-client";

async function main() {
  await initSciChart();
  initWebSocket();
}
main();

async function initSciChart() {
  // LICENSING //
  // Set your license code here
  // You can get a trial license key from https://www.scichart.com/licensing-scichart-js/
  // Purchased license keys can be viewed at https://www.scichart.com/profile
  //
  // e.g.
  //
  // SciChartSurface.setRuntimeLicenseKey("YOUR_RUNTIME_KEY");
  //
  // Also, once activated (trial or paid license) having the licensing wizard open on your machine
  // will mean any or all applications you run locally will be fully licensed.

  // Create the SciChartSurface in the div 'scichart-root'
  // The SciChartSurface, and webassembly context 'wasmContext' are paired. This wasmContext
  // instance must be passed to other types that exist on the same surface.
  const { sciChartSurface, wasmContext } = await SciChartSurface.create(
    "scichart-root"
  );

  // Create an X,Y Axis and add to the chart
  const xAxis = new NumericAxis(wasmContext);
  const yAxis = new NumericAxis(wasmContext);

  sciChartSurface.xAxes.add(xAxis);
  sciChartSurface.yAxes.add(yAxis);

  // That's it! You just created your first SciChartSurface!
}

function initWebSocket() {
  console.log("initWebSocket()");
  const socket_ = socketIOClient.io("http://localhost:3000");

  socket_.on("server_connected", (message: string) => {
    console.log("server_connected", message);
  });

  socket_.on("server_some_message", (message: string) => {
    console.log("server_some_message", message);
  });

  // send test message from the client
  setTimeout(() => {
    socket_.emit("client_some_message", "Some Message from the Client after 4 seconds");
  }, 4000);
}
