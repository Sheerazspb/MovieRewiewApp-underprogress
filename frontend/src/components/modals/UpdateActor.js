import React,{useState} from 'react'
import { updateActor } from '../../api/actor';
import { useNotification } from '../../hooks/themeHook';
import ActorForm from '../form/ActorForm';
import ModalContainer from './ModalContainer';

function UpdateActor({visible,onClose,intialState,onSuccess}) {
  const [busy, setBusy] = useState(false)
  const { updateNotification } = useNotification();
  // console.log(intialState)
  const handleSubmit = async (data) => {

    setBusy(true);
    const { error, actor } = await updateActor(intialState._id, data);
    // console.log(actor);
    setBusy(false)
    if (error) return updateNotification("error", error);
    onSuccess(actor)
    updateNotification("success", `${actor?.name} updated successfully!`);
    onClose()
  }
  return (
    <ModalContainer visible={visible} onClose={onClose} ignoreContainer>
      <ActorForm onSubmit={!busy ? handleSubmit : null} title='Update Actor' btnTitle='Update' busy={busy} intialState={intialState} />
    </ModalContainer>
  )
}

export default UpdateActor
