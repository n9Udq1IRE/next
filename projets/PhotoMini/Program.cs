using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.IO;
using System.Drawing;

namespace PhotoMini
{
    class Program
    {
        static void Main(string[] args)
        {
            /*"2012",*/
            //D:\PELLETIER\CELINE\PHOTOS\PHOTOS\2012\A TRIER\04082012\DSC02737.JPG
            string[] reps = {
            };

            string input = @"D:\PELLETIER\CELINE\PHOTOS\PHOTOS\" + reps[0];
            string output = @"E:\Temp\output.celine";
            /*if (Directory.Exists(output))
            {
                Directory.Delete(output, true);
            }*/
            traitementRepertoire(input, output);
            /*foreach (string __path in Directory.EnumerateDirectories(args[0]))
            {
                Repertoire(__path);
            }
            if (Directory.Exists(args[0]))
            {
                Repertoire(args[0]);
            }*/
        }

        static void traitementRepertoire(string input, string output)
        {
            foreach (string file in Directory.EnumerateFiles(input))
            {
                if (file.ToLower().EndsWith(".jpg"))
                {
                    DateTime dateTime = File.GetLastWriteTime(file);
                    string repertoire = dateTime.ToString("yyyy-MM-dd");
                    if (!(Directory.Exists(output + "\\" + repertoire)))
                    {
                        Directory.CreateDirectory(output + "\\" + repertoire);
                    }
                    string fileName = dateTime.ToString("HHmmss");
                    try
                    {
                        Bitmap myBitmap1 = new Bitmap(file);
                        Bitmap myBitmap2 = new Bitmap(myBitmap1, GetNewSize(myBitmap1.Width, myBitmap1.Height, 800));
                        int index = 0;
                        while (File.Exists(output + "\\" + repertoire + "\\" + fileName + "." + index + ".jpg"))
                        {
                            index++;
                        }
                        myBitmap2.Save(output + "\\" + repertoire + "\\" + fileName + "." + index + ".jpg", System.Drawing.Imaging.ImageFormat.Jpeg);
                    }
                    catch
                    {

                    }
                }
            }
            foreach (string directory in Directory.EnumerateDirectories(input))
            {
                traitementRepertoire(directory, output);
            }
        }

        static Size GetNewSize(int width, int height, int format)
        {
            Size newSize = new Size();

            double h = height;
            double w = width;
            double rapport = w / h;
            if (rapport < 0)
            {
                newSize.Width = 800;
                newSize.Height = (int)(newSize.Width * rapport);
            }
            else
            {
                newSize.Height = 800;
                newSize.Width = (int)(newSize.Height * rapport);
            }

            return newSize;
        }

        static void Repertoire(string __path)
        {
            string __pathOutput = __path + ".800x600";
            if (Directory.Exists(__pathOutput))
            {
                Directory.Delete(__pathOutput, true);
            }
            Directory.CreateDirectory(__pathOutput);
            foreach (string __file in Directory.EnumerateFiles(__path))
            {
                int index = __file.LastIndexOf('\\');
                if (index != -1 && __file.ToLower().EndsWith(".jpg"))
                {
                    string fileName = __file.Substring(index + 1);
                    try
                    {
                        Bitmap myBitmap1 = new Bitmap(__file);
                        Bitmap myBitmap2 = new Bitmap(myBitmap1, GetNewSize(myBitmap1.Width, myBitmap1.Height, 800));
                        myBitmap2.Save(__pathOutput + "\\" + fileName, System.Drawing.Imaging.ImageFormat.Jpeg);
                    }
                    catch
                    {

                    }
                }
            }
        }
    }
}
