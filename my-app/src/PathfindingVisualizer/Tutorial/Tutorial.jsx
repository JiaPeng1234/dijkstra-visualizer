// import React, { Component } from "react";
// import "./Tutorial.css";
// import { Button, Modal } from "antd";

// export default class Tutorial extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       visible: true,
//       pageNo: 1,
//     };
//   }

//   handlePrevious() {
//     let { pageNo } = this.state;
//     if (pageNo >= 2) {
//       pageNo -= 1;
//     }
//     this.setState({ pageNo: pageNo });
//   }

//   handleNext() {
//     let { pageNo } = this.state;
//     if (pageNo <= 5) {
//       pageNo += 1;
//     }
//     this.setState({ pageNo: pageNo });
//   }

//   someHandlesht() {
//     const modal = Modal.info();
//     modal.update({
//       title: "修改的标题",
//       content: "修改的内容",
//     });
//   }
//   const App = () => {
//     const [modal, contextHolder] = Modal.useModal();
  
//     return (
//       <ReachableContext.Provider value="Light">
//         <Space>
//           <Button
//             onClick={() => {
//               modal.confirm(config);
//             }}
//           >
//             Confirm
//           </Button>
//           <Button
//             onClick={() => {
//               modal.warning(config);
//             }}
//           >
//             Warning
//           </Button>
//           <Button
//             onClick={() => {
//               modal.info(config);
//             }}
//           >
//             Info
//           </Button>
//           <Button
//             onClick={() => {
//               modal.error(config);
//             }}
//           >
//             Error
//           </Button>
//         </Space>
//         {/* `contextHolder` should always under the context you want to access */}
//         {contextHolder}
  
//         {/* Can not access this context since `contextHolder` is not in it */}
//         <UnreachableContext.Provider value="Bamboo" />
//       </ReachableContext.Provider>
//     );
//   };
  
//   render() {
//     // const { pageNo } = this.props;
    
//     return (
//       <Context1.Provider value="Ant">
//         {/* contextHolder 在 Context1 内，它可以获得 Context1 的 context */}
//         {contextHolder}
//         <Context2.Provider value="Design">
//           {/* contextHolder 在 Context2 外，因而不会获得 Context2 的 context */}
//         </Context2.Provider>
//       </Context1.Provider>
//       //   <>
//       //     <Modal
//       //       title="Welcome to Pathfinding Visualizer!"
//       //       visible={this.state.visible}
//       //       //   okButtonProps={{ className: "toggle" }}
//       //       width={1000}
//       //       footer={[
//       //         <Button key="previous" type="primary" onClick={this.handlePrevious}>
//       //           Previous
//       //         </Button>,
//       //         <Button key="next" type="primary" onClick={this.someHandlesht}>
//       //           Next
//       //         </Button>,
//       //       ]}
//       //     >
//       //       <div>
//       //         <p>Some contents...</p>
//       //         <p>Some contents...</p>
//       //         <p>Some contents...</p>
//       //       </div>
//       //     </Modal>
//       //   </>
//     );
//   }
// }
