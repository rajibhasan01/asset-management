export const configData = {
  mongo: {
    url: `mongodb+srv://potteryStore:rfSf2bJAAdAUle7W@cluster0.nzlp2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    dbName: 'asset-mgt',
  },
  google: {
    clientId:
      "104443873174-d492ffnchecain2qsvmkrjei3tldobf9.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "https://hidden-waters-59301.herokuapp.com/login/auth/google/callback",
    failUrl : "https://hidden-waters-59301.herokuapp.com/login",
    successUrl: "https://hidden-waters-59301.herokuapp.com"
  },
};
