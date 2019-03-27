import { toast } from 'react-toastify';
 
export const Success = (msg) => toast.success(msg, {
  className: 'alert alert-success',
});

export const Danger = (msg) => toast.error(msg, {
  className: 'alert alert-danger',
});
