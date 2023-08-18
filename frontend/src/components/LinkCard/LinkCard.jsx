import { useState } from "react";
import { BASE_URL } from "../../api/api";
import PropTypes from "prop-types";

const LinkCard = ({ _id, longurl, urlId, views, handleUpdate }) => {
  const [open, setOpen] = useState(false);
  const [urlLink, setUrlLink] = useState(longurl || "");

  const updateUrl = async (e) => {
    e.preventDefault();

    if (urlLink === longurl) {
      alert("Enter diffent url");
      return;
    }

    if (urlLink.trim() === "") {
      alert("Enter valid url");
      return;
    }

    const isUpdated = await handleUpdate(_id, urlLink);

    if (isUpdated) {
      setOpen(false);
    }
  };

  return (
    <>
      <div key={`card-${_id}`} className="link-card">
        <p>#{_id}</p>
        <div className="shorten-url-link">
          <span>{`${BASE_URL}/url/${urlId}`}</span>
          <button
            onClick={() => {
              navigator.clipboard.writeText(`${BASE_URL}/url/${urlId}`);
              alert("Copied to clipboard");
            }}
          >
            Copy
          </button>
        </div>

        <p>longurl: {longurl}</p>

        <p>Views: {views}</p>

        <div className="link-btn-container">
          <button onClick={() => setOpen(true)}>Edit</button>
        </div>
      </div>

      {open && (
        <section
          key={`modal-${_id}`}
          className="modalContainer"
          id={`modal-dialog-${_id}`}
        >
          <form onSubmit={updateUrl} className="modal">
            <div className="modal-close">
              <button onClick={() => setOpen(false)}>⨉</button>
            </div>
            <div>
              <h3 className="text-center">Update LongUrl</h3>
            </div>

            <div>
              <input
                type="url"
                value={urlLink}
                onChange={(e) => setUrlLink(e.target.value)}
                required
              />
            </div>
            <button id="modal-btn-confirm" type="submit">
              Update
            </button>
          </form>
          <div className="overlay hidden"></div>
        </section>
      )}
    </>
  );
};

LinkCard.propTypes = {
  _id: PropTypes.string,
  longurl: PropTypes.string,
  urlId: PropTypes.string,
  views: PropTypes.number,
  handleUpdate: PropTypes.any,
};
export default LinkCard;
