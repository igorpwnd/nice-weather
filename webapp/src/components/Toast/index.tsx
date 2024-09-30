import { useToast } from "../../stores/toast";


const Toast = () => {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-0 inset-x-0 flex justify-center pointer-events-none mb-4">
      <div className="space-y-2 pointer-events-auto max-w-[600px]">
        {toasts.map((toast) => (
          <div key={toast.id} className="bg-red-500 text-white p-4 rounded shadow-lg">
            {toast.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toast;
