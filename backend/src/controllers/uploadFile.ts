import ImageKit from "imagekit";

import { v4 as uuid } from "uuid";

const imagekit = new ImageKit({
  publicKey: String(process.env.IMGKIT_PUB_KEY),
  privateKey: String(process.env.IMGKIT_PVT_KEY),
  urlEndpoint: `https://ik.imagekit.io/${String(
    process.env.IMGKIT_URLENDPOINT
  )}/`,
});

export async function uploadImg(file: any, cb: Function) {
  const mimeType: string = file?.mimetype;
  if (mimeType?.indexOf("image") !== 0) {
    // res.
    return;
  }
  const buf = file?.buffer;
  imagekit.upload(
    {
      file: buf,
      fileName: uuid(),
      tags: [mimeType],
    },
    async (err, result: any) => {
      try {
        // console.log(result);
        // console.log(result.url);
        // console.log(
        //   imagekit.url({
        //     src: result.url,
        //     transformation: [
        //       {
        //         height: 300,
        //         width: 400,
        //       },
        //     ],
        //   })
        // );
        cb(result?.url, result?.fileId);
      } catch (err) {}
    }
  );
}
