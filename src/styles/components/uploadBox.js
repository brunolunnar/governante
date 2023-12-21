import { styled } from "..";

export const UploadContainer = styled('div',{
  display: "flex",
  alignItems: "center",
  border: "2px $white dashed",
  borderRadius: "30px",

  "input[type=file]": {
    display: "none",
  },
  ".capa-box": {
    borderRight: "1px $white solid",
    width: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "27px",
  },
  ".up-box": {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100%",
    alignItems: "center",
    gap: "15px",
    cursor: "pointer",
  },
  '.drive-box':{
    width:'100%',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    gap:'1rem',
    
    padding:'2rem',
  },
  // '.upload-box':{
  //   width:'100%',
  //   display:'flex',
  //   alignItems:'center',
  //   justifyContent:'center'
  // },
  '.upload-label':{
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    gap:'.25rem',
    cursor:'pointer',
  },
  '.drive-description':{
    border:'1px solid $white',
    padding:'10px',
    borderRadius:"30px",
    cursor:'pointer'
  },
  '.drive-description:hover':{
    background:"$green"
  }

})