import { useNavigate } from "react-router-dom";
import ListFriends from "../../Components/listFriends/ListFriends";
import InfoUser from "../../Components/infoUser/InfoUser";
function ChatFrame() {
  const navigate = useNavigate();
  return (
    <>
      <ListFriends/>
      <div>

      </div>
    </>
  );
}
export default ChatFrame;
