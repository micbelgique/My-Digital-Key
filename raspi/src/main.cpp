#include <stdlib.h>
#include <nfc/nfc.h>
#include <boost/process.hpp>
#include <sstream>
#include <iostream>
#include <iomanip>

namespace bp = ::boost::process; 

std::string getArrayToHexString(uint8_t *array){
    std::ostringstream os;
    os << std::hex << std::setfill('0');
    for(std::size_t i{0}; i < 4; ++i){
  //     	std::cout << "n:" << array[i] << ":" << std::endl;
	os << std::setw(2) << static_cast<unsigned>(array[i]);

    }
    return os.str();
}

std::vector<std::string> read_outline(std::string const& file)
{
    bp::ipstream is; //reading pipe-stream
    bp::child c("/usr/bin/curl", file, bp::std_out > is, bp::std_err > bp::null);

    std::vector<std::string> data;
    std::string line;

    while (c.running() && std::getline(is, line) && !line.empty())
        data.push_back(line);

    c.wait();

    return data;
}


void writeGPIO(int gpio, int val){
//	std::ostringstream os;
//	os << "sudo echo \"" << gpio << "\" > /sys/class/gpio/export";
//	std::cout << os.str() << std::endl;	
//	std::system(os.str().c_str());

//	std::ostringstream os2;
//	os2 << "sudo echo \"out\" > /sys/class/gpio/gpio" << gpio <<"/direction";
//	std::cout << os2.str() << std::endl;
//	std::system(os2.str().c_str());

	std::ostringstream os3;
        os3 << "sudo echo \"" << val << "\" > /sys/class/gpio/gpio" << gpio << "/value";
        std::cout << os3.str() << std::endl;
        std::system(os3.str().c_str());

}

int main(int argc, const char *argv[])
{

    	if(argc < 2){
        	std::cout << "Please use like this : ./raspi <serveraddr>" << std::endl;
        	return -1;
 	}

	nfc_device *pnd;
	nfc_target nt;
	nfc_context *context;
	
	nfc_init(&context);
	if (context == NULL) {
		printf("Unable to init libnfc (malloc)\n");
		exit(EXIT_FAILURE);
	}
	const char *acLibnfcVersion = nfc_version();
	(void)argc;
	printf("%s uses libnfc %s\n", argv[0], acLibnfcVersion);
	pnd = nfc_open(context, NULL);

	if (pnd == NULL) {
		printf("ERROR: %s\n", "Unable to open NFC device.");
		exit(EXIT_FAILURE);
	}
	if (nfc_initiator_init(pnd) < 0) {
		nfc_perror(pnd, "nfc_initiator_init");
		exit(EXIT_FAILURE);
	}

	nfc_target *pnc;

	nfc_initiator_poll_dep_target(pnd, NDM_ACTIVE, nfc_baud_rate::NBR_212, NULL, pnc, 300);

	printf("NFC reader: %s opened\n", nfc_device_get_name(pnd));

	const nfc_modulation nmMifare = {
		.nmt = NMT_ISO14443A,
		.nbr = NBR_106,
	};

	writeGPIO(12, 0);
	writeGPIO(16, 0);

	while(true){
	
		if (nfc_initiator_select_passive_target(pnd, nmMifare, NULL, 0, &nt) > 0) {


                	std::ostringstream os;
        	        os << "http://" << argv[1] << ":3002/access?lock=1&userToken=";
	                os << getArrayToHexString(nt.nti.nai.abtUid);

			//std::cout << "lol" << os.str() << std::endl;


                	auto res = read_outline(os.str());

			if(res[0] == "GRANTED"){
				writeGPIO(12, 1);
				writeGPIO(16, 0);
				std::this_thread::sleep_for(std::chrono::seconds(2));
				writeGPIO(12, 0);
			}else{
				writeGPIO(12, 0);
				writeGPIO(16, 1);
				std::this_thread::sleep_for(std::chrono::milliseconds(200));
				writeGPIO(16, 0);
				std::this_thread::sleep_for(std::chrono::milliseconds(200));
				writeGPIO(16, 1);
				std::this_thread::sleep_for(std::chrono::seconds(1));
				writeGPIO(16, 0);
			}

        	}		

	}
	
	nfc_close(pnd);
        nfc_exit(context);
        exit(EXIT_SUCCESS);

}
