import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  margin: "16px 16px 0"
};

const thumb = {
  display: "inline-flex",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
};

const dropzone = {
  flex: "1",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: "2px",
  borderRadius: "2px",
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  cursor: "pointer",
  margin: "16px"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const contain = {
  border: "1px solid rgb(232, 232, 232)",
  borderRadius: "3px",
  width: "100%",
  display: "inline-block"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

export default function DropZone(props) {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    noDrag: true,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    }
  });

  const thumbs = files.map((file) => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ));

  useEffect(() => {
    files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container" style={contain}>
      <div {...getRootProps({ className: "dropzone" })} style={dropzone}>
        <input {...getInputProps({ name: "imagesDropzone" })} />
        <InsertPhotoOutlinedIcon fontSize="large" />
        <p>Selecione las imagenes del producto.</p>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
      <input type="hidden" name="images" value={JSON.stringify(files)} />
    </section>
  );
}
