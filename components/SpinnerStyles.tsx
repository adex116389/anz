import React from 'react'

interface SpinnerStylesProps {

}

export const SpinnerStyles: React.FC<SpinnerStylesProps> = ({}) => {
        return (
            <style
  dangerouslySetInnerHTML={{
    __html:
      "\n    html {\t\n    line-height: 1.15;\t\n    -webkit-text-size-adjust: 100%;\t\n  }\t\n  *,\t\n  ::after,\t\n  ::before {\t\n    box-sizing: border-box;\t\n  }\t\n  body {\t\n    opacity: 1 !important;\n    margin: 0;\t\n    font-family: Myriad pro, sans-serif;\t\n    color: #494949;\t\n    -webkit-font-smoothing: antialiased;\t\n    min-width: 320px;\t\n  }\t\n  img {\t\n    border-style: none;\t\n  }\t\n  #initial-render {\t\n    display: flex;\t\n    flex-direction: column;\t\n    align-items: center; \t\n    height: 100vh\t\n  }\t\n  #spinner-initial {\t\n    margin: auto;\t\n    margin-top: 120px;\t\n    width: 120px;\t\n    height: 120px;\t\n    position: relative;\t\n  }\t\n  @keyframes strokeAnimation {\t\n    0% {\t\n      stroke-dasharray: 1, 200;\t\n      stroke-dashoffset: 0;\t\n    }\t\n    50% {\t\n      stroke-dasharray: 89, 200;\t\n      stroke-dashoffset: -35px;\t\n    }\t\n    100% {\t\n      stroke-dasharray: 89, 200;\t\n      stroke-dashoffset: -124px;\t\n    }\t\n  }\t\n  @keyframes spin {\t\n    100% {\t\n      transform: rotate(360deg);\t\n    }\t\n  }\t\n  .spinner-image {\t\n    animation: spin 2s linear 0s infinite;\t\n    transform-origin: center center;\t\n    position: absolute;\t\n    top: 0px;\t\n    bottom: 0px;\t\n    left: 0px;\t\n    right: 0px;\t\n    margin: auto;\t\n  }\t\n  .spinner-circle {\t\n    stroke-dasharray: 100, 2000;\t\n    stroke-dashoffset: 0;\t\n    animation: strokeAnimation 1.5s ease-in-out 0s infinite;\t\n    stroke-linecap: round;\t\n    stroke: rgb(0, 125, 186);\t\n  }\t\n  .spinner-icon {\t\n    transform: translate3d(0px, 0.125em, 0px);\t\n    margin: -0.125em 0px 0px;\t\n    font-size: 48px;\t\n    color: rgb(0, 125, 186);\t\n    position: absolute;\t\n    top: 44px;\t\n    left: 44px;\t\n  }\t\n  .spinner-header {\t\n    background-color: rgb(0, 65, 101);\t\n    display: flex;\t\n    align-items: center;\t\n    width: 100%;\t\n    height: 60px;\t\n    padding: 5px 32px;\t\n  }\t\n  .spinner-footer {\t\n    width: 100%;\t\n    background-color: rgb(0, 114, 172);\t\n    color: rgb(255, 255, 255);\t\n    padding: 32px 32px;\t\n  }\t\n  .footer-text {\t\n    white-space: nowrap;\t\n  }\n"
  }}
/>

        );
}