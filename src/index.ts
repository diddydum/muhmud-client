import './style.css';

const ws = new WebSocket('ws://localhost:8080/ws');

ws.onclose = () => {
  console.log('websocket closed');
}
ws.onerror = () => {
  console.log('got ourselves an error');
}
ws.onopen = () => {
  ws.send('Test message');
}
ws.onmessage = (ev: MessageEvent) => {
  console.log(`got message: ${ev.data}`);
}