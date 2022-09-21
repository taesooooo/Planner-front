import styled from 'styled-components';

const EditCalendarBlock = styled.div`
  /* border: 1px solid green; */
`;

const Calendar = styled.div`
  border: 1px solid lightblue;
  width: 50px;
  height: 50px;
  border-radius: 10%;
  text-align: center;
  line-height: 50px;
  margin: 0 5px 1px 0;
`;

const AddCal = styled(Calendar)`
  font-size: 2rem;
  line-height: 45px;
`;

const EditCalendar = () => {
  return (
    <EditCalendarBlock>
      <Calendar>11/11</Calendar>
      <Calendar>11/12</Calendar>
      <Calendar>11/13</Calendar>
      <AddCal>+</AddCal>
    </EditCalendarBlock>
  );
};

export default EditCalendar;