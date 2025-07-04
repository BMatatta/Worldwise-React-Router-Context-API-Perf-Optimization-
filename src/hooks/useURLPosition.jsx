import {useSearchParams} from "react-router-dom";

function useURLPosition() {
  const [searchParamas] = useSearchParams();
  const lat = searchParamas.get("lat");
  const lng = searchParamas.get("lng");
  return [lat, lng];
}

export default useURLPosition;
