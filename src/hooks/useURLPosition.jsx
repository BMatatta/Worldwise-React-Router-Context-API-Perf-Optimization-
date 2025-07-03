import {useSearchParams} from "react-router-dom";

function useURLPosition() {
  const [searchParamas, setSearchParams] = useSearchParams();
  const lat = searchParamas.get("lat");
  const lng = searchParamas.get("lng");
  return [lat, lng];
}

export default useURLPosition;
