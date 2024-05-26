import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import PathConstants from "routes/PathConstant";

const Register = () => {
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const response = await fetch('http://localhost:5000/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.status === 201) {
      const responseData = await response.json();
      const accessToken = responseData.access_token;
      localStorage.setItem('access_token', accessToken);
      navigate('/');
    } else if (response.status === 400) {
      setShowPopup(true);
      setError('Tüm alanları doldurun');
    } else if (response.status === 422) {
      setShowPopup(true);
      setError('Eposta hatalı formatta');
    } else if (response.status === 417) {
      setShowPopup(true);
      setError('Şifreler eşleşmiyor')
    } else if (response.status === 409) {
      setShowPopup(true);
      setError('Eposta kaydolmuş')
    } else if (response.status === 412) {
      setShowPopup(true);
      setError('Kullanıcı adı alınmış');
    } else {
      setShowPopup(true);
      setError('Bir hata oluştu');
    }
  };
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      {showPopup && (
        <div className="popup-content">
          <div>
            <h2>Bir Hata Meydana Geldi</h2>
            <p>{error}</p>
            </div>
          <button className="close-popup" onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          /> Flowbite
        </div>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Hesap oluşturun
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {/* <div className="flex  justify-center">
                <div>
                  <label
                    for="files"
                    className="p-2 text-center border border-gray-200 rounded-md cursor-pointer"
                  >
                    Profil fotoğrafı yükle
                  </label>
                  <input id="files" className="hidden" type="file" />
                </div>
              </div> */}
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  name="userName"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Kullanıcı Adı"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tam İsim
                </label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Tam İsim"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Kullanıcı Eposta
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Kullanıcı Eposta"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Parola
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tekrar Parola
                </label>
                <input
                  type="password"
                  name="password2"
                  id="password2"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Kaydol
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                hesabın var mı?
                <a
                  href={PathConstants.LOGIN}
                  className="font-medium ml-1 text-primary-600 hover:underline dark:text-primary-500"
                >
                  Giriş yap
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
