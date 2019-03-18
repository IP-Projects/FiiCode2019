import json,subprocess,os,shutil

def buildPackages():
    os.chdir("./MultiMediaAlbumManagement")
    # subprocess.call('npm run build:library', shell=True)
    os.chdir("../")
    os.chdir("./MultiMediaAlbumManagement-extras")
    for folder in os.listdir("./"):
        os.chdir("./" + folder + '/')
        subprocess.call('npm run build:extras', shell=True)
        os.chdir("../")
    os.chdir("../")

def copyExtrasToMain():
    copyDirectory("./DistributionPackage/Extras","./MultiMediaAlbumManagement/node_modules/")
    os.chdir("./MultiMediaAlbumManagement/node_modules/@multimedia-album-management/extras")
 
def copyDirectory(src, dest):
    try:
        shutil.copytree(src, dest)
    # Directories are the same
    except shutil.Error as e:
        print('Directory not copied. Error: %s' % e)
    # Any error saying that the directory doesn't exist
    except OSError as e:
        print('Directory not copied. Error: %s' % e)

buildPackages()
