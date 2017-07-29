#include <Wire.h>
#include <PN532_I2C.h>
#include <PN532.h>
#include "NDEF/NfcAdapter.h"

int main(){

	PN532_I2C pn532_i2c(Wire);
	NfcAdapter nfc = NfcAdapter(pn532_i2c);

	if (nfc.tagPresent()) {
		NfcTag tag = nfc.read();
		tag.print();
	}

	return 0;
}
