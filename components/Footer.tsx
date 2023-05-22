import React from 'react'

interface FooterProps {

}

export const Footer: React.FC<FooterProps> = ({}) => {
        return (
            <footer style={{
                "width": "100%"
              }}>
                <div style={{
  "width": "100%",
  "backgroundColor": "rgb(0, 114, 172)",
  "color": "rgb(255, 255, 255)",
  "paddingTop": "32px",
  "paddingBottom": "32px"
}}>
    <div style={{
  "display": "flex",
  "flexDirection": "column",
  "WebkitBoxPack": "center",
  "justifyContent": "center",
  "flex": "1 0 auto",
  "maxWidth": "100%",
  "margin": "0px",
  "paddingLeft": "32px",
  "paddingRight": "32px"
}}>
    <span style={{
  "color": "rgb(255, 255, 255)"
}}>
    <div>
    © Australia and New Zealand Banking Group Limited (ANZ) <span style={{
  "whiteSpace": "nowrap"
}}> ABN 11 005 357 522.</span>
    </div>
</span>
</div>
</div>
              </footer>
        );
}