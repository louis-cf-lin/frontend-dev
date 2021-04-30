import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import NewImportForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPage = () => {
  const addMeetupHandler = (enteredMeetupHandler) => {
    console.log(enteredMeetupHandler);
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetupPage;
