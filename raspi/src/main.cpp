#include <stdlib.h>
#include <nfc/nfc.h>
#include <thread>
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

	printf("a");

	uint8_t *t = static_cast<uint8_t*>(malloc(11));

	printf("b");

	while (true) {
		printf("c");
		nfc_target_receive_bytes(pnd, t, 11, 300);
		print_hex(t, 11);
		std::this_thread::sleep_for(std::chrono::milliseconds(200));
		printf("d");
	}

	nfc_close(pnd);
	nfc_exit(context);
	exit(EXIT_SUCCESS);
}
