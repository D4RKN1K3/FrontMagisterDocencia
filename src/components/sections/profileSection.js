import React from 'react';

const ProfileSection = ({ item }) => {
  return (
    <div className="border-1 shadow-lg shadow-gray-700 rounded-lg">

      <div className="flex rounded-t-lg bg-orange-400 w-full text-white">
        <div className="h-40 w-40 overflow-hidden sm:rounded-full sm:relative sm:p-0 top-10 left-5 p-3">
          <img
            src="https://media.licdn.com/dms/image/C4D03AQH8qidO0nb_Ng/profile-displayphoto-shrink_800_800/0/1615696897070?e=2147483647&v=beta&t=ia3wfE2J7kVLdBy9ttkgUDAA_ul29fymykhQo0lABDo"
            alt="Logo"
          />
        </div>

        <div className="w-2/3 sm:text-center pl-5 mt-10 text-start">
          <p className="font-bold text-heading sm:text-4xl text-2xl">
            {item.firstName} {item.secondName} {item.surnameM} {item.surnameF}
          </p>
          <p className="text-heading"></p>
        </div>

      </div>

      <div className="p-5">

        <div className="flex flex-col sm:flex-row sm:mt-10">

          <div className="flex flex-col sm:w-1/3">

            <div className="py-3 sm:order-none order-3">
              <h2 className="text-lg font-bold text-start text-orange-400">Información Personal</h2>
              <div className="border-2 w-20 border-orange-600 my-3"></div>

              <div>
                <div className="flex items-center my-1">
                  <div className="truncate">{item.rut}</div>
                </div>
                <div className="flex items-center my-1">
                  <div>{item.sex}</div>
                </div>
                <div className="flex items-center my-1">
                  <div>{item.stateCivil}</div>
                </div>
                <div className="flex items-center my-1">
                  <div>{item.birthday}</div>
                </div>
              </div>
            </div>

            <div className="py-3 sm:order-none order-2">
              <h2 className="text-lg font-bold text-start text-orange-400">Información de Contacto</h2>
              <div className="border-2 w-20 border-orange-600 my-3"></div>

              <div>
                <div className="flex items-center my-1">
                  <div className="ml-2">{item.address}</div>
                </div>
                <div className="flex items-center my-1">
                  <div className="ml-2">{item.email}</div>
                </div>
                <div className="flex items-center my-1">
                  <div className="ml-2">{item.phone}</div>
                </div>
              </div>
            </div>

            <div className="py-3 sm:order-none order-1 text-start">
              <h2 className="text-lg font-bold text-start text-orange-400">Education Background</h2>
              <div className="border-2 w-20 border-orange-600 my-3"></div>

              <div className="flex flex-col space-y-1">

                <div className="flex flex-col">
                  <p className="font-semibold text-xs text-gray-700">2021</p>
                  <p className="text-sm font-medium">
                    <span className="text-green-700">B.E. (INFORMATION TECHNOLOGY)</span>, PIMPRI CHINCHWAD
                    COLLEGE OF ENGINEERING, PUNE.
                  </p>
                  <p className="font-bold text-xs text-gray-700 mb-2">Percentage: 76.61</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-xs text-gray-700">2017</p>
                  <p className="text-sm font-medium"><span className="text-green-700">HSC</span>, RAJARSHI SHAHU
                    COLLEGE, LATUR.</p>
                  <p className="font-bold text-xs text-gray-700 mb-2">Percentage: 80.77</p>
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-xs text-gray-700">2015</p>
                  <p className="text-sm font-medium"><span className="text-green-700">SSC</span>, DNYANESHWAR HIGH
                    SCHOOL, LATUR.</p>
                  <p className="font-bold text-xs text-gray-700 mb-2">Percentage: 93.80</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:w-2/3 order-first sm:order-none sm:-mt-10 text-start">

            <div className="py-3">
              <h2 className="text-lg font-bold text-orange-400">About Me</h2>
              <div className="border-2 w-20 border-orange-600 my-3"></div>
              <p>To get Link career opportunity which would help me to utilize my academic background to assist
                me to gain experience, employ my excellent skills, and enable me to make positive
                contribution.</p>
            </div>

            <div className="py-3">
              <h2 className="text-lg font-bold text-orange-400">Professional Experience</h2>
              <div className="border-2 w-20 border-orange-600 my-3"></div>

              <div className="flex flex-col">
                <div className="flex flex-col">
                  <p className="text-lg font-bold text-gray-700">Netcracker Technology | Software Engineer</p>
                  <p className="font-medium text-sm text-gray-700">2021 - Present</p>
                  <p className="font-medium text-sm text-gray-700 mt-2 mb-1">Key Responsibilities</p>
                  <ul className="text-sm list-disc pl-4 space-y-1">
                    <li>Working on customer facing product</li>
                    <li>Delivering highly efficient solutions</li>
                    <li>Solving critical bugs</li>
                  </ul>
                </div>
                <div className="flex flex-col mt-8">
                  <p className="text-lg font-bold text-gray-700">TailwindFlex.com | Lead</p>
                  <p className="font-medium text-sm text-gray-700">2020-2021</p>
                  <p className="font-medium text-sm text-gray-700 mt-2 mb-1">Key Responsibilities</p>
                  <ul className="text-sm list-disc pl-4 space-y-1">
                    <li>Developed usable components</li>
                    <li>Solving complex problems</li>
                    <li>Solving critical bugs</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="py-3">
              <h2 className="text-lg font-bold text-orange-400">Projects</h2>
              <div className="border-2 w-20 border-orange-600 my-3"></div>

              <div className="flex flex-col text-start">
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-gray-700">Used Books mobile app</p>
                  <p className="font-normal text-sm text-gray-700 mb-1 pl-2">A platform to sell as well as to
                    buy used books only for PCCoE College due to this reuse of books will be there
                    beneficial for environment also indirectly helps increase communication between
                    juniors and seniors.</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-gray-700">Parking Automation System</p>
                  <p className="font-normal text-sm text-gray-700 mb-1 pl-2">it’s Link web application which
                    helps you to book your slot for your car just like booking Link movie ticket from home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;
