module.exports = `
<script type='text/javascript'>
    let protocol = window.location.protocol === "http:" ? "ws://" : "wss://";
    let address = \`\${
      protocol + window.location.host + window.location.pathname
    }/ws\`;
    let socket = new WebSocket(address);
    socket.onmessage = function (msg) {
      console.log(msg)
      if (msg.data == 'refresh') window.location.reload();
    }
</script>
`;
