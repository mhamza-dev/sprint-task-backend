import express from "express";
import cors from "cors";
import router from "./routes";

const app = express();
const corsOptions = {
  origin: [
    "http://localhost:3001",
    "http://192.168.0.119:3001",
    "exp://192.168.0.119:8081", // Your Expo app's URL
    /\.ngrok\.io$/, // Allow ngrok domains
  ],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(router);

// const prisma = new PrismaClient();

// app.post("/test", async (req, res) => {
//   const { url } = req.body;
//   console.log("Downloading:", url);

//   try {
//     const response = await axios.get(url, { responseType: "arraybuffer" });

//     if (response.status === 200) {
//       const contentType = response.headers["content-type"] || "video/mp4";
//       const videoBuffer = Buffer.from(response.data as ArrayBuffer);

//       // Create uploads directory if it doesn't exist
//       const uploadDir = path.join(__dirname, "uploads", "instagram_videos");
//       await fs.mkdir(uploadDir, { recursive: true });

//       const filename = `${uuidv4()}.${contentType.split("/")[1]}`;
//       const filePath = path.join(uploadDir, filename);

//       // Save file to local filesystem
//       await fs.writeFile(filePath, videoBuffer);

//       // Save reference in MongoDB through Prisma
//       const video = await prisma.video.create({
//         data: {
//           filename,
//           url: `/uploads/instagram_videos/${filename}`, // relative URL path
//         },
//       });

//       res.json({
//         message: "Upload successful",
//         data: video,
//         url: `/uploads/instagram_videos/${filename}`,
//       });
//     } else {
//       res.status(500).json({ message: "Failed to download video" });
//     }
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ message: "Error occurred", error: error.message });
//   }
// });

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
