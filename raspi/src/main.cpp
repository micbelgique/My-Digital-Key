#include <stdlib.h>
#include <nfc/nfc.h>
static void
print_hex(const uint8_t *pbtData, const size_t szBytes)
{
	size_t  szPos;

	for (szPos = 0; szPos < szBytes; szPos++) {
		printf("%02x  ", pbtData[szPos]);
	}
	printf("\n");
}
int
main(int argc, const char *argv[])
{
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

	printf("lol");

	nfc_close(pnd);
	nfc_exit(context);
	exit(EXIT_SUCCESS);
}
