import React, { useEffect } from "react";
import Dynamsoft from "dwt";
import "./Dwt.css";

const DWT = () => {
  let DWObject = null;
  let containerId = "dwtcontrolContainer";

  const Dynamsoft_OnReady = () => {
    DWObject = Dynamsoft.DWT.GetWebTwain(containerId);
  };
  const acquireImage = () => {
    if (DWObject) {
      DWObject.SelectSourceAsync()
        .then(() => {
          return DWObject.AcquireImageAsync({
            IfDisableSourceAfterAcquire: true,
          });
        })
        .then((result) => {
          console.log(result);
        })
        .catch((exp) => {
          console.error(exp.message);
        })
        .finally(() => {
          DWObject.CloseSourceAsync().catch((e) => {
            console.error(e);
          });
        });
    }
  };

  useEffect(() => {
    Dynamsoft.DWT.RegisterEvent("OnWebTwainReady", () => {
      Dynamsoft_OnReady();
    });
    Dynamsoft.DWT.ProductKey =
      "t0184SwUAAG0hLdA7E5q+uTbBfQU1gX6jleiiksmanMf1n3nqbcjTxd3iVHziwKcbUX/qFjbkbSNSvR/uUPfuR4GIQUWu3eaOTNfp0tLyGK0O0c40RAs7RMv/Vkt0i1+b5i9raszhANwjoPuC7ABKIJVTAQ/doi1DBnAP0A6QOt0EPhZ5bO/6P3SNvm0vNZ08wKnnO8uNPcdZruuvTr+rfojyUoJLAMopZwD3AO0AqQEZYHxMVeQN3OkLkQ==";
    Dynamsoft.DWT.ResourcesPath = "/dwt-resources";
    Dynamsoft.DWT.Containers = [
      {
        WebTwainId: "dwtObject",
        ContainerId: containerId,
        Width: "600px",
        Height: "700px",
      },
    ];
    Dynamsoft.DWT.Load();
  }, [ containerId]);
  return (
    <>
      <button onClick={acquireImage}> Scan </button>
      <div id={containerId}> </div>
    </>
  );
};

export default DWT;
// export default class DWT extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     DWObject = null;
//     containerId = 'dwtcontrolContainer';
//     componentDidMount() {
//         Dynamsoft.DWT.RegisterEvent('OnWebTwainReady', () => {
//             this.Dynamsoft_OnReady()
//         });
//         Dynamsoft.DWT.ProductKey = "t0184SwUAAG0hLdA7E5q+uTbBfQU1gX6jleiiksmanMf1n3nqbcjTxd3iVHziwKcbUX/qFjbkbSNSvR/uUPfuR4GIQUWu3eaOTNfp0tLyGK0O0c40RAs7RMv/Vkt0i1+b5i9raszhANwjoPuC7ABKIJVTAQ/doi1DBnAP0A6QOt0EPhZ5bO/6P3SNvm0vNZ08wKnnO8uNPcdZruuvTr+rfojyUoJLAMopZwD3AO0AqQEZYHxMVeQN3OkLkQ==";
//         Dynamsoft.DWT.ResourcesPath = "/dwt-resources";
//         Dynamsoft.DWT.Containers = [{
//             WebTwainId: 'dwtObject',
//             ContainerId: this.containerId,
//             Width: '600px',
//             Height: '700px'
//         }];
//         Dynamsoft.DWT.Load();
//     }
//     Dynamsoft_OnReady() {
//         this.DWObject = Dynamsoft.DWT.GetWebTwain(this.containerId);
//     }
//     acquireImage() {
//         if (this.DWObject) {
//             this.DWObject.SelectSourceAsync()
//             .then(() => {
//                 return this.DWObject.AcquireImageAsync({
//                     IfDisableSourceAfterAcquire: true,
//                 });
//             })
//             .then( (result) => {
//                 console.log(result);
//             })
//             .catch((exp) => {
//                 console.error(exp.message);
//             })
//             .finally(() => {
//                 this.DWObject.CloseSourceAsync().catch((e) => {
//                     console.error(e);
//                 });
//             });
//         }
//     }
//     render() {
//         return (<>
//             <button onClick = {() => this.acquireImage()} > Scan </button>
//             <div id = {this.containerId}> </div>
//             </>
//         );
//     }
// }
