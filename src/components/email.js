var postmark = require("postmark");

const email = () => {
  var client = new postmark.ServerClient(
    "da2cfdf1-b4fb-44fe-b0dd-28ed4d3740fe"
  );

  client.sendEmail({
    From: "mj@uxph.org",
    To: "mj@uxph.org",
    Subject: "Hello from Postmark",
    HtmlBody: "<strong>Hello</strong> dear Postmark user.",
    TextBody: "Hello from Postmark!",
    MessageStream: "outbound",
  });
};

export default email;
