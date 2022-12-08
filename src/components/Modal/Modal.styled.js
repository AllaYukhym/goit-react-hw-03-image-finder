import style from 'styled-components';

export const Backdrop = style.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const ModalWindow = style.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
   width:100%
  max-width: calc(100vw - 48px); 
  max-height: calc(100vh - 24px);
  object-fit: cover;
  `;

export const ModalImage = style.img`

object-fit: cover;
 
`;
//  width: 100%;
//  height: 100%;

// backgroundImage: ${props => `url(${props.src})`} ;
// object-fit: cover;

// min-height: 300px;
//  padding: 10px;
//  width:100%;

// ---------for overlay---------
//       display: flex;
//   justify-content: center;
//   align-items: center;

// ------------for modal------
//  max-height: calc(100vh - 24px);
// max-width: calc(100vw - 48px);
