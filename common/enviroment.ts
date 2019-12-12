export const enviroment = {
    server:{port: process.env.SERVER_PORT || 3001},
    db:{url: process.env.DB_URL || "mongodb+srv://divideai:divideai@divide-ai-cluster-mtc3a.mongodb.net/test?retryWrites=true&w=majority"},
    security:{saltRounds:process.env.SALT_ROUND || 10},
};
