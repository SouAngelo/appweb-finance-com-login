import React, { useContext, useRef, useState, useEffect } from "react";
import Burger from "@animated-burgers/burger-squeeze";
import "@animated-burgers/burger-squeeze/dist/styles.css";
import { Link } from "react-router-dom";
import { authContext } from "../../Contexts/auth";
import "./header.sass";

function Header() {
  const { signed, user, signOut } = useContext(authContext);

  const [open, setOpen] = useState(false);
  const hamb = useRef(null);

  const avatar = useRef(null);
  const [avatarImage, setAvatarImage] = useState(
    "https://cdn-icons-png.flaticon.com/128/149/149071.png"
  );

  function handleAvatarContainer() {
    avatar.current.classList.toggle("hide");
  }

  function changeAvatar(e) {
    setAvatarImage(e.target.src);
    avatar.current.classList.toggle("hide");

    userStorage(e.target.src);
  }

  function userStorage(data) {
    localStorage.setItem("avatar", JSON.stringify(data));
  }

  useEffect(() => {
    function loadStorage() {
      const storageUser = localStorage.getItem("avatar");

      let data =
        JSON.parse(storageUser) ||
        "https://cdn-icons-png.flaticon.com/128/149/149071.png";

      setAvatarImage(data);
    }

    loadStorage();
  }, [avatarImage]);

  const openHamburguer = () => {
    setOpen(!open);
    avatar.current.classList.add("hide");

    if (!open) {
      hamb.current.style.display = "flex";
    } else {
      hamb.current.style.display = "none";
    }
  };

  return (
    <header>
      <h1>
        <Link to="/">Finance</Link>
      </h1>

      {signed ? (
        <>
          <Burger isOpen={open} onClick={openHamburguer} id="burguer" />

          <nav className="nav-profile" ref={hamb}>
            <img src={avatarImage} onClick={handleAvatarContainer} />
            <p>Olá {user.nome}</p>
            <button onClick={signOut}>X</button>
          </nav>
        </>
      ) : (
        <nav>
          <Link to="/" className="home-link">
            Home
          </Link>
          <Link to="/login">Entrar</Link>
        </nav>
      )}

      <div className="avatar hide" ref={avatar}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/4333/4333609.png"
          onClick={changeAvatar}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
          onClick={changeAvatar}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/128/6997/6997660.png"
          onClick={changeAvatar}
        />
        <img
          src="https://cdn-icons-png.flaticon.com/128/3963/3963493.png"
          onClick={changeAvatar}
        />
      </div>
    </header>
  );
}

export default Header;
