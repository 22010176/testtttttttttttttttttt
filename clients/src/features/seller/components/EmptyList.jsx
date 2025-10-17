import { faBoxArchive } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function EmptyList({ message = "Không tìm thấy kết quả!" }) {
  return (
    <div className="py-15 text-center">
      <FontAwesomeIcon icon={faBoxArchive} className="mb-4" size='4x' />
      <p className="text-gray-400 text-lg">
        {message}
      </p>
    </div>
  )
}

export default EmptyList