import { useQueryClient, useMutation } from '@tanstack/react-query';

const useDataMutation = ({ mutationFn, onMutate: expected, queryKey }) => {
  const queryClient = useQueryClient();

  return useMutation({
    queryKey,
    mutationFn,
    onMutate(variable) {
      queryClient.cancelQueries();

      const previousData = queryClient.getQueryData(queryKey);
      console.log('previous: ', queryClient.getQueryData(queryKey));
      queryClient.setQueryData(queryKey, expected(variable));

      return { previousData };
    },
    onError(error, newComment, context) {
      queryClient.setQueryData(queryKey, context.previousData);
    },
    onSuccess() {
      queryClient.invalidateQueries(queryKey);
    },
  });
};

export default useDataMutation;
