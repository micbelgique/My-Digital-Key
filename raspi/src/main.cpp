#include <stdlib.h>
#include <nfc/nfc.h>
#include <boost/asio.hpp>
#include <iostream>
#include <iomanip>

std::string getArrayToHexString(uint8_t* array, size_t size){
    std::ostringstream os;
    os << std::hex << std::uppercase << std::setfill('0');
    for(std::size_t i{0}; i < size; ++i){
        os << std::setw(2) << *(array+i);
    }
    return os.str();
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

	if (nfc_initiator_select_passive_target(pnd, nmMifare, NULL, 0, &nt) > 0) {
        	nt.nti.nai.abtUid;
        	boost::asio::io_service svc;
        	boost::asio::ip::tcp::socket sock{svc};
        	boost::asio::ip::tcp::endpoint ep{boost::asio::ip::address::from_string(argv[1]), 3002};
        //sock.connect(ep);
		std::ostringstream os;
		os << "GET /access?lock=1&userToken=";
		os << getArrayToHexString(nt.nti.nai.abtUid, nt.nti.nai.szUidLen);
		std::string req{os.str()};
        	sock.send(boost::asio::buffer(req));
		sock.close();
		nfc_close(pnd);
		nfc_exit(context);
		exit(EXIT_SUCCESS);
	}
}
