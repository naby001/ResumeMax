import React from "react";
import { Rnd } from "react-rnd";
import GitHubIcon from "@mui/icons-material/GitHub";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const iconMap = {
  github: <GitHubIcon />,
  phone: <PhoneIcon />,
  email: <EmailIcon />,
  facebook: <FacebookIcon />,
  yt: <YouTubeIcon />,
  insta: <InstagramIcon />,
  wa: <WhatsAppIcon />,
  linkedin: <LinkedInIcon />,
  twitter: <TwitterIcon />,
};

const IconRenderer = ({ 
  icon, 
  index, 
  updateIcon, 
  focusedIconIndex, 
  setFocusedIconIndex, 
  updateIconStruct 
}) => {
  const handleFocusIcon = () => {
    console.log(index);
    setFocusedIconIndex(index);
  };

  return (
    <Rnd
      size={{ width: icon.width, height: icon.height }}
      position={{ x: icon.x, y: icon.y }}
      onDragStart={handleFocusIcon}
      onDragStop={(e, data) => {
        updateIcon(index, { x: data.x, y: data.y });
        setFocusedIconIndex(null);
      }}
      enableResizing={
       { top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}
      }
    //   onResizeStart={handleFocusIcon}
    //   onResizeStop={(e, direction, ref, delta, position) => {
    //     updateIconStruct(index, {
    //       width: ref.offsetWidth,
    //       height: ref.offsetHeight,
    //     });
    //   }}
    >
      <div
        style={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: icon.width,
          height: icon.height,
         
        }}
        onClick={handleFocusIcon}
      >
        {iconMap[icon.type] || <div>No Icon</div>}
      </div>
    </Rnd>
  );
};

export default IconRenderer;
