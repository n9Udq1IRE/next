using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO;

namespace IA0001
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            string[] files =
            {
                @"D:\Google Drive\Next\Projets\IA0001\temp\photo0002.jpg",
                @"D:\Google Drive\Next\Projets\IA0001\temp\photo0008.jpg",
                @"D:\Google Drive\Next\Projets\IA0001\temp\photo0009.jpg"
            };
            int index = 0;
            while (index < files.Length)
            {
                switch (index)
                {
                    case 0:
                        pictureBox1.ImageLocation = files[index];
                        pictureBox2.ImageLocation = Transfo(files[index], 1);
                        pictureBox3.ImageLocation = Transfo(files[index], 3);
                        break;
                    case 1:
                        pictureBox4.ImageLocation = files[index];
                        pictureBox5.ImageLocation = Transfo(files[index], 1);
                        pictureBox6.ImageLocation = Transfo(files[index], 3);
                        break;
                    case 2:
                        pictureBox7.ImageLocation = files[index];
                        pictureBox8.ImageLocation = Transfo(files[index], 1);
                        pictureBox9.ImageLocation = Transfo(files[index], 3);
                        break;
                }
                index++;
            }
        }

        private string Transfo(string file, int type)
        {
            string newFile = file;
            Bitmap bitmap = new Bitmap(file);
            int x = 0;
            while (x < bitmap.Width)
            {
                int y = 0;
                while (y < bitmap.Height)
                {
                    Color pixelColor = Color.White;
                    int moyenne = 0;
                    switch (type)
                    {
                        case 1:
                            pixelColor = bitmap.GetPixel(x, y);
                            if (pixelColor.R >= pixelColor.G && pixelColor.R >= pixelColor.B)
                            {
                                bitmap.SetPixel(x, y, Color.FromArgb(255, 0, 0));
                            }
                            if (pixelColor.G >= pixelColor.R && pixelColor.G >= pixelColor.B)
                            {
                                bitmap.SetPixel(x, y, Color.FromArgb(0, 255, 0));
                            }
                            if (pixelColor.B >= pixelColor.R && pixelColor.B >= pixelColor.G)
                            {
                                bitmap.SetPixel(x, y, Color.FromArgb(0, 0, 255));
                            }
                            break;
                        case 2:
                            pixelColor = bitmap.GetPixel(x, y);
                            moyenne = (pixelColor.R + pixelColor.G + pixelColor.B) / 3;
                            bitmap.SetPixel(x, y, Color.FromArgb(moyenne, moyenne, moyenne));
                            break;
                        case 3:
                            pixelColor = bitmap.GetPixel(x, y);
                            moyenne = (pixelColor.R + pixelColor.G + pixelColor.B) / 3;
                            int valeur = 0;
                            if (moyenne > 127)
                            {
                                valeur = 255;
                            }
                            bitmap.SetPixel(x, y, Color.FromArgb(valeur, valeur, valeur));
                            break;
                    }
                    y++;
                }
                x++;
            }
            newFile = Guid.NewGuid() + ".jpg";
            if (File.Exists(newFile))
            {
                File.Delete(newFile);
            }
            bitmap.Save(newFile);

            return newFile;
        }

    }
}
