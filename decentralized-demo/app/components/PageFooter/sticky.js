/* to create sticky footer, height need to be coordinated between content and footer */
import styled from 'styled-components';

const height = 60;

// sticky footer height determined by param
export const Content = styled.div`
`;

export const StickyFooter = styled.div`
  position: fixed;
  bottom: 16px;
  left: 50%;
  transform: translateX(-50%);
`;
