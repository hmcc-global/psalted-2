import { fetchFolders } from '../../reducers';
import axios from 'axios';
import { AnyAction, Dispatch } from 'redux';

const getFoldersGlobal = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const { data, status } = await axios.get('/api/groups/get');
    if (status === 200) {
      dispatch(fetchFolders(data));
    }
  } catch (e) {
    console.log(e);
  }
};
export default getFoldersGlobal;