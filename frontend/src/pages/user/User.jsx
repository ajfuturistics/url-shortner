import { useEffect, useState } from "react";
import Nav from "../../components/Nav/Nav";
import "../../styles/user.css";
import { API } from "../../api/api";
import { useAuth } from "../../components/AuthProvider/AuthProvider";
import LinkCard from "../../components/LinkCard/LinkCard";

const User = () => {
  const [longurl, setLongurl] = useState("");
  const [myUrls, setMyUrls] = useState([]);

  const { token } = useAuth();

  const fetchData = () => {
    API({
      method: "GET",
      url: "/api/shorten",
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        setMyUrls(res.data.urlArr);
      })
      .catch((err) => {
        alert(err?.response?.data?.message || "Failed to fetch urls");
      });
  };

  const handleShorten = (e) => {
    e.preventDefault();

    API({
      method: "POST",
      url: "/api/shorten",
      headers: {
        Authorization: `bearer ${token}`,
      },
      data: {
        longurl,
      },
    })
      .then((res) => {
        alert(res?.data?.message || "Url created");
        fetchData();
      })
      .catch((err) => {
        alert(err?.response?.data?.message || "Failed to shorten url");
      });
  };

  const handleUpdate = async (id, url) => {
    try {
      const { data } = await API({
        method: "PUT",
        url: `/api/shorten/${id}`,
        headers: {
          Authorization: `bearer ${token}`,
        },
        data: {
          longurl: url,
        },
      });

      alert(data?.message || "Url Updated");
      fetchData();
      return true;
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to update url");
      return false;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <Nav />

      <section>
        <h1 className="text-center">Create Short Link</h1>

        <form onSubmit={handleShorten} className="short-container">
          <input
            name="longurl"
            id="longurl"
            type="url"
            placeholder="Enter url"
            value={longurl}
            onChange={(e) => setLongurl(e.target.value)}
            required
          />
          <button type="submit">Shorten</button>
        </form>
      </section>

      <h2 className="text-center">My Short Links</h2>

      {myUrls.length !== 0 && (
        <section className="card-container">
          {myUrls.map((url) => (
            <LinkCard key={url?._id} {...url} handleUpdate={handleUpdate} />
          ))}
        </section>
      )}
    </div>
  );
};

export default User;
