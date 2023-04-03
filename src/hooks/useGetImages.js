import { useState, useEffect } from 'react';
import AWS from 'aws-sdk';
import {
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  AWS_S3_BUCKET,
} from '@config/service';

export const useGetImages = ({ type }) => {
  const [imageData, setImageData] = useState([]);

  useEffect(() => {
    const s3 = new AWS.S3({
      accessKeyId: AWS_ACCESS_KEY,
      secretAccessKey: AWS_SECRET_ACCESS_KEY,
      region: AWS_REGION,
    });

    const params = {
      Bucket: AWS_S3_BUCKET,
      Prefix: type ? 'home-' : 'login-',
    };

    s3.listObjects(params, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const objects = data.Contents;

        const getImageData = (obj) => {
          s3.getObject({ Bucket: AWS_S3_BUCKET, Key: obj.Key }, (err, data) => {
            if (err) {
              console.log(err);
            } else {
              const imageSrc = `https://${AWS_S3_BUCKET}.s3.amazonaws.com/${obj.Key}`;
              setImageData((prevImageData) => [
                ...prevImageData,
                { src: imageSrc, metadata: data.Metadata },
              ]);
            }
          });
        };

        objects.forEach((obj) => getImageData(obj));
      }
    });
  }, [type]);

  return imageData;
};
