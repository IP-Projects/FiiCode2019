import json,subprocess,os,shutil

def copyDirectory(src, dest):
    try:
        shutil.copytree(src, dest)
    # Directories are the same
    except shutil.Error as e:
        print('Directory not copied. Error: %s' % e)
    # Any error saying that the directory doesn't exist
    except OSError as e:
        print('Directory not copied. Error: %s' % e)

def buildLibrary():
    os.chdir("./MultiMediaAlbumManagement")
    subprocess.call('npm run build:library', shell=True)
    os.chdir("../")

    
def buildExtras():
    os.chdir("./MultiMediaAlbumManagement-extras")
    subprocess.call('npm run build:all', shell=True)
    os.chdir("../")

def copyExtrasToMain():
    if os.path.isdir("./MultiMediaAlbumManagement/node_modules/@multimedia-album-management/extras"):
            shutil.rmtree("./MultiMediaAlbumManagement/node_modules/@multimedia-album-management/extras")
    copyDirectory("./DistributionPackage/Extras","./MultiMediaAlbumManagement/node_modules/@multimedia-album-management/extras")

def copyExtrasToDistribution():
    os.chdir("./MultiMediaAlbumManagement-extras/dist")
    for folder in os.listdir("./"):
        if os.path.isdir("../../DistributionPackage/Extras/"+folder):
            shutil.rmtree("../../DistributionPackage/Extras/"+folder)
        copyDirectory("./" + folder,"../../DistributionPackage/Extras/"+folder)
    os.chdir("../../")



buildExtras()
copyExtrasToDistribution()
copyExtrasToMain()
buildLibrary()