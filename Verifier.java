import javax.imageio.IIOException;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.awt.image.ColorModel;
import java.io.File;
import java.io.IOException;

public class Verifier {
	private static final int WIDTH = 4096; // also the height
	private static final int NUM_PIXELS = WIDTH * WIDTH;

	public static void main(final String[] args) throws IOException {
		if (args.length == 0) {
			System.err.println("Needs at least one argument: filepath(s) to PNG image");
			System.exit(1);
		}

		for (final String filePath : args) {
			System.out.println(filePath);

			BufferedImage image;
			try {
				image = ImageIO.read(new File(filePath));
			} catch (final IIOException e) {
				System.err.println("\tCannot find file: " + filePath);
				continue;
			}

			checkAllRgb(image);
		}
	}

	private static boolean checkAllRgb(final BufferedImage image) {
		if (image.getWidth() != WIDTH || image.getHeight() != WIDTH) {
			System.out.println("\tNOT AllRGB. Dimensions of image should be 4096x4096 pixels.");
			return false;
		}

		final ColorModel model = image.getColorModel();

		if (model.hasAlpha()) {
			System.out.println("\t[Warning] image has alpha channel.");
		}

		final boolean[] rgbValues = new boolean[NUM_PIXELS];

		int duplicates = 0;

		for (int y = 0; y < WIDTH; y++) {
			for (int x = 0; x < WIDTH; x++) {
				final int color = Math.floorMod(image.getRGB(x, y), NUM_PIXELS);
				if (rgbValues[color]) { // duplicate found
					duplicates++;
				} else {
					rgbValues[color] = true;
				}
			}
		}

		if (duplicates == 0) {
			System.out.println("\tAllRGB. Image contains each possible RGB value exactly once.");
			return true;
		}

		System.out.println("\tNOT AllRGB. Duplicates: " + duplicates);

		// print out not found colors only if there are less than 10 duplicates
		if (duplicates < 10) {
			for (int i = 0; i < rgbValues.length; i++) {
				if (!rgbValues[i]) {
					System.out.println("\t\tColor not found: " + String.format("#%06X", i));
				}
			}
		}
		
		return false;
	}

}