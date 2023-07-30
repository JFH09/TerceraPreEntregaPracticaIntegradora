const politicaAutorizacion = (roles) => {
  return (req, res, next) => {
    console.log("REQUEST EN AUT 3", req.session.user);
    if (roles[0].toUpperCase() === "PUBLIC") return next();
    //const user = req.session.user;
    //console.log("USUARIO EN AUTHACCESS 5", user);
    if (!req.session.user)
      return res
        .status(401)
        .send({ status: "error", error: "Not authenticated" });
    console.log("Usuario en midd", req.user);
    if (!roles.includes(req.session.user.rol.toUpperCase()))
      return res.json({ status: "error", payload: "Forbidden" });
    //return res.status(403).send({ status: "error", error: "Not authorized" });
    next();
  };
};

export default politicaAutorizacion;
