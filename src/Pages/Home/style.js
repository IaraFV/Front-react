import styled from "styled-components";

export const OrgCard = styled.div`
    width: 60rem;
    min-width: 15rem;
    overflow-x: auto;
    height: 20rem;
    ::-webkit-scrollbar {
        background: #171821;
        width: 8px;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #d9d9d9;
        border-radius: 20px;
      }
`;

export const CardP = styled.div`
    width: 58rem;
    border-radius: 10px;
    background: #21222D;
    padding: 0.5rem!important;
    margin-bottom: 2%;
    margin-top: 1%;
    border-left: 2px solid #2684FF;
`;

export const CardBody = styled.div`
    
    justify-content: space-between;
`;
export const CardTitle= styled.div`
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    font-size: 1.3rem;
    line-height: 27px;
    color: #FFFFFF;
`;

 export const CardTextData = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 0.8rem;
    line-height: 15px;
    color: #717986;
    margin-top: 1%;
`;

export const TituloHome = styled.div`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    line-height: 39px;
    color: #FFFFFF;
    width: 10rem;
`;

