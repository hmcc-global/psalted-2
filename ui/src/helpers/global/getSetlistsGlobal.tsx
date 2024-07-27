import { fetchSetlists } from '../../reducers';
import axios from 'axios';
import { AnyAction, Dispatch } from 'redux';

const getSetlistsGlobal = async (dispatch: Dispatch<AnyAction>) => {
  try {
    const { data, status } = await axios.get('/api/setlists/get');
    if (status === 200) {
      dispatch(fetchSetlists(data));
    }
  } catch (e) {
    console.log(e);
  }
};
export default getSetlistsGlobal;
