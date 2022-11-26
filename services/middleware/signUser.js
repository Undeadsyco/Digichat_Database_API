const signUser = ({ verifieduser, error }, req, res, next) => {
  try {
    if (error) throw error;

    let passwordMatch = authService.comparePassword(req.body.password, verifieduser.password)
    if (!passwordMatch) res.json({ result: false, message: 'incorrect password', verifieduser: null });

    let token = authService.signUser(verifieduser);

    res.cookie('jwt', token);
    res.json({ result: true, message: 'Login successful', verifieduser });
  } catch (error) {
    res.json({ errMessage: error.message }).status(500);
  }
}